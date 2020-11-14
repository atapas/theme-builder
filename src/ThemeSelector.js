import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _ from 'lodash';
import shortid from 'shortid';
import {useTheme} from './theme/useTheme';
import * as themesFromStore from './theme/schema.json';

const ThemedButton = styled.button`
    border: 0;
    display: inline-block;
    padding: 12px 24px;
    font-size: 14px;
    border-radius: 4px;
    margin-top: 5px;
    width: 100%;
    cursor: pointer;
`;

const Wrapper = styled.li`
    display: inline-block;
    width: 200px;
    padding: 48px;
    text-align: center;
    margin: 5px;
    border-radius: 4px;
    height: 200px;
    border: 1px solid #000;
`;

export default (props) => {

    const [data, setData] = useState(themesFromStore.data);
    const [themes, setThemes] = useState([]);
    const [theme, themeLoaded, setMode] = useTheme();

    const themeSwitcher = selectedTheme => {
        console.log(selectedTheme);
        setMode(JSON.stringify(selectedTheme));
    };

    useEffect(() => {
        setThemes(_.keys(data));
    }, [data]);

    const ThemeCard = props => {
        return(
            <Wrapper style={{backgroundColor: `${data[_.camelCase(props.theme.name)].colors.body}`, 
                    color: `${data[_.camelCase(props.theme.name)].colors.text}`, 
                    fontFamily: `${data[_.camelCase(props.theme.name)].font}`}}>
                    <span>Click on the button to set this theme</span>
                <ThemedButton onClick={ (theme) => themeSwitcher(props.theme) }
                    style={{backgroundColor: `${data[_.camelCase(props.theme.name)].colors.button.background}`, 
                    color: `${data[_.camelCase(props.theme.name)].colors.button.text}`,
                    fontFamily: `${data[_.camelCase(props.theme.name)].font}`}}>
                    {props.theme.name}
                </ThemedButton>
            </Wrapper>
        )
    }

    return (
        <>
            <h2>Theme Selector</h2>
            <ul>
            {
                themes.length > 0 && 
                    themes.map(theme =>(
                        <ThemeCard theme={data[theme]} key={shortid.generate()} />
                    ))
            }
            </ul>
        </>
    )
}