import connection from "../database/databaseConnection.js";

export async function returnUser(username: string){
    return await connection.query(`SELECT * FROM fighters WHERE username = $1;`, [username]);
}

export async function insertUsername(username: string){
    return await connection.query(`INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, 0, 0, 0);`, [username]);
}

export async function updateUserResults(username: string, wins: number, losses: number, draws: number){
    return await connection.query(`UPDATE fighters SET wins = $1, losses = $2, draws= $3 WHERE username = $4;`, [wins, losses, draws, username]);
}

export async function getRanking(){
    return await connection.query(`SELECT * FROM fighters ORDER BY wins, draws;`);
}