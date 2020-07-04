//documentation followed: 
//1. http://zetcode.com/javascript/nodepostgres/ -- for specific node js use case
//2. https://opensource.com/article/17/10/set-postgres-database-your-raspberry-pi -- for initial install and user setup
//3. https://kb.objectrocket.com/postgresql/how-to-update-a-postgresql-table-with-node-842 -- creating a new table via js and some other tricks

require('dotenv').config();
const pg = require('pg');
//this is the user i created with the name of the database (test). not to be confused with the name of one of the tables in the db, people
const cs = process.env.DATABASE.replace('<USER>', process.env.USER).replace('<PASSWORD>', process.env.PASSWORD);
const client = new pg.Client(cs);

client.connect();

createRecord = async () => {
	console.log("creating record");

	try {
		const res = await client.query(
			`INSERT INTO people(name, company) VALUES($1, $2) RETURNING *`,
			['test insert', 'test insert company']
			);
		console.log("create result", res.rows);
	} catch (err) {
		console.log(err);
	}
}

readRecord = async () => {
	console.log("reading records");

	try {
		const res = await client.query(`SELECT * 
										FROM PEOPLE
										WHERE name LIKE 'person%'`);
		console.log("read result", res.rows);	
	} catch (err) {
		console.log(err);
	}
}

updateRecord = async () => {
	console.log("updating a record");

	try {
		await client.query(`UPDATE people
							SET company = 'updated company' 
							WHERE name = 'person 1'`);
		const res = await client.query(`SELECT * 
										FROM PEOPLE
										WHERE name = 'person 1'`);
		console.log("update result", res.rows);	
	} catch (err) {
		console.log(err);
	}
}

deleteRecord = async () => {
	console.log("inserting and then deleting a record");

	try {
		const res1 = await client.query(
			`INSERT INTO people(name, company) VALUES($1, $2) RETURNING *`,
			['name to delete', 'company']
			);
		console.log('inserted record', res1.rows);

		await client.query(`
			DELETE FROM people
			WHERE name = 'name to delete'
			`);

		const res2 = await client.query(`SELECT * 
										FROM PEOPLE
										`);
		console.log("after delete result", res2.rows);	
	} catch (err) {
		console.log(err);
	}
}

(async () => {
	await createRecord();
	await readRecord();
	await updateRecord();
	await deleteRecord();
	await client.end();
})();
