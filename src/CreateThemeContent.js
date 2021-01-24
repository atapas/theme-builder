
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { generate } from 'shortid';
import _ from 'lodash';
import { useTheme } from './theme/useTheme';

const Container = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 3rem;
`;

const Section = styled.div`
    vertical-align: top;
    margin-right: 10px;
    padding: 10px;
`;

const Row = styled.div`
    padding: 5px;
`;

const Preview = styled.div`
    border: 1px solid #000000;
    border-radius: 4px;
    width: 100%;
    height: 200px;
    padding: 5px;
`;

const CreateThemeContent = props => {

    const defaultTheme = {
        themeName: "",
        bgColor: "#Cf4307",
        txtColor: "#FFFFFF",
        btnBgColor: "#000000",
        btnTxtColor: "#FFFFFF",
        linkColor: "#10BEEA",
        font: "Roboto"

    };
    const { getFonts } = useTheme();
    const [state, setState] = useState(defaultTheme);
    
    const [newTheme, setNewTheme] = useState({});

    const getThemeObj = () => {
        const themeObj = {};
        themeObj[_.camelCase(state.themeName)] = {
            "id": generate(),
            "name": state.themeName,
            "colors": {
                "body": state.bgColor,
                "text": state.txtColor,
                "button": {
                    "text": state.btnBgColor,
                    "background": state.btnTxtColor
                },
                "link": {
                    "text": state.linkColor,
                    "opacity": 1
                }
            },
            "font": state.font
        };
        return themeObj;
    }

    useEffect(() => {
        const updated = getThemeObj();
        setNewTheme({...updated});
    }, [state]);

    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    const createTheme = () => {
        setState({...defaultTheme});
        props.create(newTheme);
    }
    

    return(
    <>
        <button 
            style={{float:'right'}} 
            onClick={ createTheme }
            disabled={ state.themeName.trim().length === 0 }>
            Happy? Let's Create
        </button>
        <Container>
            <Section>
                <Row>
                    <label htmlFor="th_name">Theme Name:</label> {' '}
                    <input 
                        type="text" 
                        id="themeName" 
                        name="themeName" 
                        value={ state.themeName }
                        placeholder="Specify a name" 
                        onChange={ handleChange }/>
                </Row>
                <Row>
                    <label htmlFor="bg_color">Background Color:</label> {' '}
                    <input type="color" id="bg_color" name="bgColor" value= { state.bgColor } onChange={ handleChange }/>
                </Row>
                <Row>
                    <label htmlFor="txt_color">Text Color:</label> {' '}
                    <input type="color" id="txt_color" name="txtColor" value={ state.txtColor } onChange={ handleChange }/>
                </Row>
                <Row>
                    <label htmlFor="btn_bg_color">Button Background Color:</label> {' '}
                    <input type="color" id="btn_bg_color" name="btnBgColor" value={ state.btnBgColor } onChange={ handleChange }/>
                </Row>
                <Row>
                    <label htmlFor="btn_txt_color">Button Text Color:</label> {' '}
                    <input type="color" id="btn_txt_color" name="btnTxtColor" value={ state.btnTxtColor } onChange={ handleChange }/>
                </Row>
                <Row>
                    <label htmlFor="link_color">Link Color:</label> {' '}
                    <input type="color" id="link_color" name="linkColor" value={ state.linkColor } onChange={ handleChange }/>
                </Row>
                <Row>
                    <label htmlFor="font">Select a Font:</label> {' '}
                    <select name="font" id="font" onChange={ handleChange } value={state.font}>
                        {getFonts().map((font, index) =>
                            <option value={ font } key={ index }>{ font }</option>
                        )}
                    </select>
                </Row>
            </Section>

            <Section>
                <span><b>Preview</b></span>
                <Preview style={{backgroundColor: state.bgColor, color: state.txtColor, fontFamily: state.font}}>
                    <p>
                        This is for preview only. Pick the color and font from the 
                        left side to see it working.
                    </p>
                    <button className="btn" style={{backgroundColor:state.btnBgColor, color:state.btnTxtColor, fontFamily: state.font}}>
                        I am a Button
                    </button> {'  '}
                    <a href="#" style={{color:state.linkColor, fontFamily: state.font}}>I am Link</a>
                </Preview>
            </Section>
        </Container>
    </>
    )
};

export default CreateThemeContent;