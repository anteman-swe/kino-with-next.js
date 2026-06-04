import { marked } from 'marked';
import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import styles from './Cookiepolicy.module.scss';

export default async function Cookiepolicy() {
    const filePath = path.join(process.cwd(), 'public', 'kino-cookie-policy.md');

    let cookiePolicy = '';

    try {
        cookiePolicy = await fs.readFile(filePath, 'utf-8');
    } catch (error) {
        console.error('Could not read file:', error);
        cookiePolicy = 'Hoppsan, textinnehållet kunde inte läsas in...';
    }
    const policyToPresent = marked.parse(cookiePolicy);

    return (
      <>
        <div
          dangerouslySetInnerHTML={{ __html: policyToPresent }}
          className={styles.cookiepolicy}
        ></div>
        <Link href={"/"} className={styles.linkBack}>
          <span className={styles.linkArrow}> &#10226; </span> Tillbaka till
          startsidan
        </Link>
      </>
    );
}