import React from 'react';
import styles from './CharacterDetail.module.css';
// import bowmanImg from './../../../public/images/jobicons/bowman.png';
// import magicianImg from './../../../public/images/jobicons/bowman.png';
// import pirateImg from './../../../public/images/jobicons/bowman.png';
// import thiefImg from './../../../public/images/jobicons/bowman.png';
// import warriorImg from './../../../public/images/jobicons/bowman.png';
// import allImg from './../../../public/images/jobicons/bowman.png';

const CharacterDetail = ({character, deleteCharacter}) => {
    // var jobName;
    // switch(character.class) {
    //     case "Bow Master": case "Marksman":
    //         jobName = "bowman";
    //         break;
    //     case "Arch Mage (I/L)": case "Arch Mage (F/P)": case "Bishop":
    //         jobName = "magician";
    //         break;  
    //     case "Buccaneer": case "Corsair":
    //         jobName = "pirate";
    //         break;  
    //     case "Night Lord": case "Shadower":
    //         jobName = "thief";
    //         break; 
    //     case "Hero": case "Paladin": case "Dark Knight":
    //         jobName = "warrior";
    //         break; 
    //     default:
    //         jobName = "all";
    //         break; 
    // }

    return (
        <div className={styles.CharacterDetail}>
            <div>
                {/* <img src={process.env.PUBLIC_URL + `/images/${jobName}.png`} alt="Class Type"></img> */}
                job img
            </div>
            <div className={styles.stackedDetail}>
                <p className={styles.ign}>{character.ign}</p>
                <p className={styles.ign}>{character.class}</p>
            </div>
            <div className={styles.stackedDetail}>
                <p>Lvl.</p>
                <p className={styles.level}>{character.level}</p>
            </div>
            <div>
                <button type="button" onClick={deleteCharacter}>
                    Delete    
                </button>
            </div>
        </div>
    )
}

export default CharacterDetail;