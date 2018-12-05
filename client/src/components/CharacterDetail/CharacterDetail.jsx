import React, { Component } from 'react';
import styles from './CharacterDetail.module.css';
import bowman from '../../img/jobicons/bowman.png';
import magician from '../../img/jobicons/magician.png';
import pirate from '../../img/jobicons/pirate.png';
import thief from '../../img/jobicons/thief.png';
import warrior from '../../img/jobicons/warrior.png';
import all from '../../img/jobicons/all.png';

class CharacterDetail extends Component {
    constructor(props) {
        super(props)
    }

    deleteCharacter = (e) => {
        console.log(this.props.character._id);
        this.props.deleteCharacter(this.props.character._id)
    }

    render() {
        var jobImg;
        switch (this.props.character.class) {
            case "Bow Master": case "Marksman":
                jobImg = bowman;
                break;
            case "Arch Mage (I/L)": case "Arch Mage (F/P)": case "Bishop":
                jobImg = magician;
                break;
            case "Buccaneer": case "Corsair":
                jobImg = pirate;
                break;
            case "Night Lord": case "Shadower":
                jobImg = thief;
                break;
            case "Hero": case "Paladin": case "Dark Knight":
                jobImg = warrior;
                break;
            default:
                jobImg = all;
                break;
        }
        return (
            <div className={styles.CharacterDetail}>
                <div className={styles.detailSegment}>

                    {/* <img src={process.env.PUBLIC_URL + `/images/${jobName}.png`} alt="Class Type"></img> */}
                    <img src={jobImg} alt="Class type"></img>
                </div>
                <div className={styles.stackedDetail}>
                    <p className={styles.ign}>{this.props.character.ign}</p>
                    <p className={styles.ign}>{this.props.character.class}</p>
                </div>
                <div className={styles.stackedDetail}>
                    <p>Lvl.</p>
                    <p className={styles.level}>{this.props.character.level}</p>
                </div>
                <div className={styles.detailSegment}>
                    <div>
                        <button type="button" onClick={this.deleteCharacter}>
                            Delete
                    </button>
                    </div>
                </div>
            </div >
        )
    }
}

export default CharacterDetail;