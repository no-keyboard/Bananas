require('dotenv').config();
const discord = require('discord.js');
const bot = new discord.Client();
const TOKEN = process.env.TOKEN;
const open = require('opn');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');

bot.login(TOKEN);
bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}`);
});

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const messageMaker = (state, stores, lastUpdate) => {
	let fields = [];

	stores.forEach(store => {
		fields.push({
			name: store.storeAddress,
			value: `Next Available: ${store.nextAvailable}`
		})
	});

	const embedMsg = {
		embed: {
			title: `Walgreens in ${state}`,
			description: "https://www.walgreens.com/findcare/vaccination/covid-19",
			fields,
            footer: {
                text: lastUpdate
            }
		}
	}

	return embedMsg;
}

const keepAlive = true;

const watchUrls = [
	"https://www.vaccinehawk.com/"
]

const initBrowser = async () => {
    const browser = await puppeteer.launch({
    	headless: true,
        executablePath: 'chromium-browser'
    });

    const vaccineHawkPage = await browser.newPage();
    let hawkLastUpdate;

    while(keepAlive) {
    	let now = new Date();
        const timestamp = ("0" + now.getHours()).slice(-2)   + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);

        try {
        	const res = vaccineHawkPage.goto(watchUrls[0]);
        	await vaccineHawkPage.waitForSelector("#pr_id_1");
        	result = await vaccineHawkPage.evaluate(() => {
        		let discordInfo = {
                    states: []
                };

                const checkStateStores = (state, stateName, filter) => {
                    let stateStores = {
                        stateName,
                        matchingStores: []
                    }

                    state.parentNode.querySelector("a").click();
                    let stores = state.parentNode.querySelectorAll("div.p-accordion-content > div");

                    for(store of stores) {
                        let storeInfo = store.querySelectorAll("a");
                        console.log(storeInfo);
                        let storeAddress = storeInfo[0].innerText;
                        let nextAvailable = storeInfo[1].innerText;

                        if(!filter) {
                            stateStores.matchingStores.push({
                                storeAddress,
                                nextAvailable
                            }); 
                        } else {
                            filter.forEach(el => {
                                if(storeAddress.includes(el)) {
                                    stateStores.matchingStores.push({
                                        storeAddress,
                                        nextAvailable
                                    }); 
                                }
                            });
                        }

                        
                    }

                    return stateStores;
                }

        		for(let state of document.querySelectorAll("h2")) {
        			//console.log(state.textContent);
        			if(state.textContent.trim() === "CT") {
                        discordInfo.states.push(checkStateStores(state, "CT"));
        			}

                    if(state.textContent.trim() === "NY") {
                        let filter = [
                        "QUEENS"
                        ];

                        discordInfo.states.push(checkStateStores(state, "NY", filter));
                    }
        		}

                discordInfo.lastUpdate = document.querySelector("strong").textContent;

        		console.log(discordInfo);
        		return discordInfo;
        	});

        	// console.log(result);
            // console.log(result.states[0].matchingStores);

        	if(result.lastUpdate != hawkLastUpdate) {
                console.log(`${timestamp} >>> Getting latest updates.`);

                result.states.forEach(state => {
                    if(state.matchingStores.length > 0) {
                        bot.channels.cache.get('724459802838827080').send(messageMaker(state.stateName, state.matchingStores, result.lastUpdate));
                    }
                });
        	} else {
                console.log(`${timestamp} >>> ${hawkLastUpdate.trim()}`)
            }

            hawkLastUpdate = result.lastUpdate;

        	await vaccineHawkPage.waitForTimeout(15000);
        } catch (err) {
        	console.error(err);
        }
    }
}

initBrowser();
