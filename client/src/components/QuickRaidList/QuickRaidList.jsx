import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './QuickRaidList.module.css';
import zakumImg from '../../img/jobicons/all.png';
import horntailImg from '../../img/jobicons/all.png';
import customImg from '../../img/jobicons/all.png';

class QuickRaidList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            joe: "joe"
        }
    }



    render() {
        return (
            <div className={styles.QuickRaidList}>
                <div className={styles.listSegment}>
                    <img src={horntailImg} alt="horntail"></img>
                    <p>Horntail</p>
                    <Link to="/">New Run</Link>
                </div>
                <div className={styles.listSegment}>
                    <img src={zakumImg} alt="zakum"></img>
                    <p>Zakum</p>
                    <Link to="/">New Run</Link>
                </div>
                <div className={styles.listSegment}>
                    <img src={customImg} alt="custom boss"></img>
                    <p>Custom Run</p>
                    <Link to="/">New Run</Link>
                </div>
            </div>
        )
    }
}

export default QuickRaidList;