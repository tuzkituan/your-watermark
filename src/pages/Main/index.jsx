import React, { Component } from 'react'
import IG from '../../assets/ig.png'
import styles from './index.scss';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    handleChange = (e) => {
        this.setState({ text: e.target.value });
    }
    renderMain = () => {
        const { text } = this.state;
        return (
            <div className={styles.mainContainer}>
                <form>
                    <label>
                        Text:
                    <input type="text" name="text" value={text} onChange={this.handleChange} />
                    </label>
                </form>
            </div>
        )
    }
    renderImage = () => {
        const { text } = this.state;
        return (
            <div className={styles.exportImageContainer}>
                <img src={IG} alt='instagram' className={styles.imgLogo} />
                <div className={styles.textLogo}>
                    <span className={styles.text}>
                        {text}
                    </span>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className={styles.Main}>
                <p className={styles.title}>Your watermark</p>
                {this.renderMain()}
                {this.renderImage()}
            </div>
        )
    }
}
