import { marked } from 'marked';
import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import styles from './BistroMenu.module.scss';
import BistroSection from '../components/bistro/bistroSection/BistroSection';

export default async function Cookiepolicy() {
    const filePath = path.join(process.cwd(), 'public', 'bistro','bistro-menu.md');

    let bistroMenu = '';

    try {
        bistroMenu = await fs.readFile(filePath, 'utf-8');
    } catch (error) {
        console.error('Could not read file:', error);
        bistroMenu = 'Hoppsan, textinnehållet kunde inte läsas in...';
    }
    const menuToPresent = marked.parse(bistroMenu);

    return (
      <>
        <BistroSection />
        <div
          dangerouslySetInnerHTML={{ __html: menuToPresent }}
          className={styles.bistroMenu}
        ></div>
        <Link href={"/"} className={styles.linkBack}>
          <span className={styles.linkArrow}> &#10226; </span> Tillbaka till
          startsidan
        </Link>
      </>
    );
}