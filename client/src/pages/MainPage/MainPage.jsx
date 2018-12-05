import React from 'react';
import styles from './MainPage.module.css';
import LeaderBoard from '../../components/LeaderBoard/LeaderBoard';
import QuickRaidList from '../../components/QuickRaidList/QuickRaidList';

const MainPage = (props) => {
    return (
        <>
            {props.NavBar}
            <div className={styles.MainPage}>
                <div className={styles.left}>
                    <h1>Add a Boss Run</h1>
                    <hr />
                    <QuickRaidList />
                </div>
                <div className={styles.right}>
                    <h1>Leaderboard</h1>
                    <LeaderBoard />
                </div>
            </div>
        </>

    );
};

export default MainPage;