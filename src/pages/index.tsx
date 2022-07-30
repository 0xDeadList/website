import styles from './index.less';
import Home from './Home';
import FAQ from './FAQ';
import LinkItem from '@/components/LinkItem';
import Footer from '@/Layouts/Footer';

export default function IndexPage() {
  return (
    <div className={styles.container}>
      <Home />
      <FAQ />
      <Footer />
    </div>
  );
}
