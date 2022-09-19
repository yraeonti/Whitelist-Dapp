
import styles from '../styles/Home.module.css'

const RenderButton = (props) => {
    console.log(props);
    if (props.walletConnected) {
        if (props.joinedWhitelist) {
          return (
            <div className={styles.description}>
              Thanks for joining the Whitelist!
            </div>
          );
        } else if (props.loading) {
          return <button className={styles.button}>Loading...</button>;
        } else {
          return (
            <button onClick={props.addAddressToWhitelist} className={styles.button}>
              Join the Whitelist
            </button>
          );
        }
      } else {
        return (
          <button onClick={props.connectWallet} className={styles.button}>
            Connect your wallet
          </button>
        );
      }
}


export default RenderButton