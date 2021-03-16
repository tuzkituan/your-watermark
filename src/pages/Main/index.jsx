import React, { Component } from 'react'
import html2canvas from 'html2canvas'
import IG from '../../assets/ig.svg'
import FB from '../../assets/fb.svg'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            selectedIcon: 1, // 1 ig, 2 fb,
            logoSize: 50, // px
            textSize: 22, // px
        }
        this.canvasRef = React.createRef();
    }

    handleChange = (e) => {
        if (e.target.value.length < 30)
            this.setState({ text: e.target.value });
    }

    handleChangeIcon = (selectedIcon) => {
        this.setState({
            selectedIcon
        })
    }
    renderImage = () => {
        const { text, selectedIcon, logoSize, textSize } = this.state;
        return (
            <div className={styles.borderContainer}>
                <div className={styles.exportImageContainer}>
                    <div id="canvasRef" ref={this.canvasRef} className={styles.imageContainer}>
                        {selectedIcon === 1 &&
                            <div className={styles.imgContainer}>
                                <img src={IG} alt='instagram' className={styles.imgLogo}
                                    style={{ width: `${logoSize}px`, height: `${logoSize}px` }} /></div>}

                        {selectedIcon === 2 &&
                            <div className={styles.imgContainer}><img src={FB} alt='facebook' className={styles.imgLogo}
                                style={{ width: `${logoSize}px`, height: `${logoSize}px` }} /></div>}
                        {/* <div className={styles.divider} /> */}
                        <span className={styles.textLogo}>
                            <span className={styles.text} style={{ fontSize: `${textSize}px` }}>
                                {text}
                            </span>
                        </span>
                    </div>
                </div>
                <div className={styles.exportButtonContainer}>
                    <span onClick={() => this.printDocument(this.canvasRef.current)}>
                        DOWNLOAD
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
                <div className={styles.iconContainer}>
                    <div
                        onClick={() => this.handleChangeIcon(1)}
                        className={selectedIcon === 1 ? styles.active : ''}>
                        <img src={IG} alt='instagram'
                            className={styles.imgIcon} />
                    </div>
                    <div
                        onClick={() => this.handleChangeIcon(2)}
                        className={selectedIcon === 2 ? styles.active : ''}>
                        <img src={FB} alt='facebook'
                            className={styles.imgIcon} />
                    </div>
                </div>
                <div className={styles.optionContainer}>
                    <div className={styles.iconSize}>
                        <p>Icon size: {logoSize}px</p>
                        <input
                            type="range" min="1" max="50"
                            value={logoSize}
                            className={styles.slider}
                            onChange={(e) => {
                                this.setState({
                                    logoSize: e.target.value
                                })
                            }}
                            id="logoSize" />
                    </div>
                    <div className={styles.textSize}>
                        <p>Text size: {textSize}px</p>
                        <input
                            type="range" min="1" max="50"
                            value={textSize}
                            className={styles.slider}
                            onChange={(e) => {
                                this.setState({
                                    textSize: e.target.value
                                })
                            }}
                            id="textSize" />
                    </div>
                </div>
                <div className={styles.copyrightContainer}>
                    <p>Made by <a href='https://facebook.com/tuzkituan'>Nguyen Ngoc Tuan <span>(Lewis Nguyen)</span></a></p>
                    <a href='https://facebook.com/groups/phonephotographyvietnam/'>memories of us - vietnam photography</a>
                </div>
            </div>
        )
    }

    printDocument = (domElement) => {
        html2canvas(domElement).then(canvas => {
            var a = document.createElement('a');
            a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
            a.download = 'your-watermark.jpg';
            a.click();
        })
        this.addUserToServer()
    }

    addUserToServer = async () => {
        const { text, selectedIcon } = this.state;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "*")
        // myHeaders.append('Accept', 'application/json');
        // myHeaders.append('Access-Control-Allow-Credentials', 'true');
        // myHeaders.append('GET', 'POST', 'OPTIONS');
        myHeaders.append('Access-Control-Allow-Origin', 'https://arcane-reaches-46099.herokuapp.com/api/create-new-watermark-user');

        var raw = JSON.stringify({
            "name": text,
            "type": selectedIcon === 1 ? 'ig' : 'fb'
        })

        var requestOptions = {
            mode: 'cors',
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://arcane-reaches-46099.herokuapp.com/api/create-new-watermark-user", requestOptions)
            .then(response => response.text())
            .then(result => {
                // console.log(result)
            })
            .catch(error => {
                // console.log('error', error) 
            });
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
