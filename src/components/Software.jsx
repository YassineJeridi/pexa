// components/Software.jsx
import React from 'react';
import afterEffectsIcon from '../assets/softwares/vecteezy_adobe-after-effects-icon_46437267.png';
import illustratorIcon from '../assets/softwares/vecteezy_adobe-illustrator-icon_46437283.png';
import lightroomIcon from '../assets/softwares/vecteezy_adobe-lightroom-icon_46437265.png';
import photoshopIcon from '../assets/softwares/vecteezy_adobe-photoshop-logo-transparent-background_46437272.png';
import premiereIcon from '../assets/softwares/vecteezy_adobe-premiere-pro-icon_46437285.png';
import canvaIcon from '../assets/softwares/vecteezy_canva-3d-icon_47657562.png';
import capcutIcon from '../assets/softwares/vecteezy_capcut-transparent-icon_48759325.png';
import davinciIcon from '../assets/softwares/vecteezy_davinci-resolve-icon_48759342.png';
import styles from '../styles/Software.module.css';

const Software = () => {
    const softwareList = [
        { icon: davinciIcon, alt: 'DaVinci Resolve' },
        { icon: capcutIcon, alt: 'CapCut' },
        { icon: canvaIcon, alt: 'Canva' },
        { icon: premiereIcon, alt: 'Adobe Premiere Pro' },
        { icon: photoshopIcon, alt: 'Adobe Photoshop' },
        { icon: lightroomIcon, alt: 'Adobe Lightroom' },
        { icon: illustratorIcon, alt: 'Adobe Illustrator' },
        { icon: afterEffectsIcon, alt: 'Adobe After Effects' }
    ];

    return (
        <section className={styles.software}>
            {/* Dynamic background gradient */}
            <div className={styles.backgroundGradient}></div>

            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <h2 className={styles.title}>SOFTWARE</h2>
                        <div className={styles.titleGlow}></div>
                    </div>
                    <p className={styles.subtitle}>
                        Professional tools I use to create stunning visual content
                    </p>
                </div>

                <div className={styles.softwareGrid}>
                    {softwareList.map((software, index) => (
                        <div key={index} className={styles.softwareItem}>
                            <div className={styles.softwareIcon}>
                                <img src={software.icon} alt={software.alt} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>{softwareList.length}</div>
                        <div className={styles.statLabel}>Tools</div>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>5+</div>
                        <div className={styles.statLabel}>Years</div>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>Pro</div>
                        <div className={styles.statLabel}>Level</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Software;
