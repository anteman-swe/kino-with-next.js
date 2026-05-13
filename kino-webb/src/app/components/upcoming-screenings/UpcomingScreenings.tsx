import style from './UpcomingScreenings.module.scss';

export default function UpcomingScreenings() {  
    return (    
        <div className={style.upcomingScreenings}>
            <h2 className={style.upcomingScreeningsHeading}>Kommande visningar</h2>
            <div className={style.upcomingScreeningsTrack}>
                <div className={style.upcomingScreeningsCard}>
                    <img className={style.upcomingScreeningsImg} src="/film1.jpg" alt="Film 1" />
                    <h4 className={style.upcomingScreeningsTitle}>Film 1</h4>
                    <p className={style.upcomingScreeningsTime}>18:00</p>
                    <p className={style.upcomingScreeningsRoom}>Salong 1</p>
                </div>
                <div className={style.upcomingScreeningsCard}>
                    <img className={style.upcomingScreeningsImg} src="/film2.jpg" alt="Film 2" />
                    <h4 className={style.upcomingScreeningsTitle}>Film 2</h4>
                    <p className={style.upcomingScreeningsTime}>20:30</p>
                    <p className={style.upcomingScreeningsRoom}>Salong 2</p>
                </div>
                <div className={style.upcomingScreeningsCard}>
                    <img className={style.upcomingScreeningsImg} src="/film3.jpg" alt="Film 3" />
                    <h4 className={style.upcomingScreeningsTitle}>Film 3</h4>       
                    <p className={style.upcomingScreeningsTime}>21:00</p>
                    <p className={style.upcomingScreeningsRoom}>Salong 3</p>
                </div>
                <div className={style.upcomingScreeningsCard}>
                    <img className={style.upcomingScreeningsImg} src="/film4.jpg" alt="Film 4" />
                    <h4 className={style.upcomingScreeningsTitle}>Film 4</h4>       
                    <p className={style.upcomingScreeningsTime}>22:00</p>
                    <p className={style.upcomingScreeningsRoom}>Salong 4</p>
                </div>
            </div>
        </div>
    );
}
