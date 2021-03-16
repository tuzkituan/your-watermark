import React, { Component } from 'react'
import html2canvas from 'html2canvas'
import IG from '../../assets/ig.svg'
import FB from '../../assets/fb.svg'
import styles from './index.module.scss'

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            selectedIcon: 2, // 1 ig, 2 fb,
            logoSize: 50, // px
            textSize: 22, // px
        }
        this.canvasRef = React.createRef();
    }

    handleChange = (e) => {
        this.setState({ text: e.target.value });
    }

    renderImage = () => {
        const { text, selectedIcon, logoSize, textSize } = this.state;
        return (
            <div className={styles.borderContainer}>
                <div id="canvasRef" ref={this.canvasRef} className={styles.exportImageContainer}>
                   {selectedIcon === 1 &&  <img src={IG} alt='instagram' className={styles.imgLogo} style={{ width: logoSize, height: logoSize }}/> }
                   {selectedIcon === 2 &&  <img src={FB} alt='facebook' className={styles.imgLogo} style={{ width: logoSize, height: logoSize }} /> }
                    <div className={styles.divider} />
                    <span className={styles.textLogo}>
                        <span className={styles.text} style={{fontSize: textSize }}>
                            {text}
                        </span>
                    </span>
                </div>
                <div className={styles.inputContainer}>
                    <form>
                        {/* <label>Text:</label> */}
                        <input type="text"
                            value={text}
                            onChange={this.handleChange}
                            placeholder="Enter your text here"
                            className={styles.textInput} />
                    </form>
                </div>
                <div className={styles.exportButtonContainer}>
                    <span onClick={() => this.printDocument(this.canvasRef.current)}>
                        DOWNLOAD
                    </span>
                </div>
            </div>
        )
    }

    printDocument = (domElement) => {
        html2canvas(domElement).then(canvas => {
            var a = document.createElement('a');
            a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
            a.download = 'instagram-logo.jpg';
            a.click();
        })
    }

    render() {
        return (
            <div className={styles.Main}>
                <p className={styles.title}>Your watermark</p>
                {this.renderImage()}
            </div>
        )
    }
}
