import axios from "axios";
import * as starRepository from "../repositories/starRepository.js";

export async function battleResult(firstUser: string, secondUser: string){

    const user1 = await starRepository.returnUser(firstUser);
    const user2 = await starRepository.returnUser(secondUser);

    if(user1.rowCount === 0){
        await starRepository.insertUsername(firstUser);
    }

    if(user2.rowCount === 0){
        await starRepository.insertUsername(secondUser);
    }

    const user1Repos = await axios.get(`http://api.github.com/users/${firstUser}/repos`);
    const user2Repos = await axios.get(`http://api.github.com/users/${secondUser}/repos`);

    let stargazerUser1: number = 0;
    let stargazerUser2: number = 0;
    user1Repos.data.map(obj => stargazerUser1 += obj.stargazers_count);
    user2Repos.data.map(obj => stargazerUser2 += obj.stargazers_count);
    
    
    const winner: string = (stargazerUser1 > stargazerUser2 ? firstUser : secondUser);
    const loser: string = (stargazerUser1 < stargazerUser2 ? firstUser : secondUser);

    if(stargazerUser1 === stargazerUser2){
        await starRepository.updateUserResults(firstUser, user1.rows[0].wins, user1.rows[0].losses, user1.rows[0].draws+1);
        await starRepository.updateUserResults(secondUser, user2.rows[0].wins, user2.rows[0].losses, user2.rows[0].draws+1);
        
        return {
            winner: null,
            loser: null,
            draw: true
        }
    }else{
        await starRepository.updateUserResults(winner, user1.rows[0].wins + 1, user1.rows[0].losses, user1.rows[0].draws);
        await starRepository.updateUserResults(loser, user2.rows[0].wins, user2.rows[0].losses + 1, user2.rows[0].draws);
        
        return {
            winner: winner,
            loser: loser,
            draw: false
        }
    }
}