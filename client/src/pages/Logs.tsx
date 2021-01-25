import React, {useState} from "react";
import { Menu } from 'antd'
import { QuestionCircleFilled, BookOutlined } from '@ant-design/icons';
import Audit from "../components/Logs/Audit";
import LogList from "../components/Logs/LogList";

export const Logs = () => {

    const audit = 'audit';
    const logs = 'logs';
    const [comp, setComp] = useState(<Audit/>);

    let state = {
        current: audit,
    };

    let updateState = (e : any) => {
        state = {
            current: e.key,
        };
        switch (state.current){
            case audit: setComp(<Audit/>);
            break;
            case logs: setComp(<LogList/>);
            break;
        }
    };

    return(
        <div>
            <h1>Audit & Logs</h1>
            <Menu onClick={updateState} defaultSelectedKeys={[audit]} mode="horizontal">
                <Menu.Item key={audit} icon={<QuestionCircleFilled/>}>
                    Audit
                </Menu.Item>
                <Menu.Item key={logs} icon={<BookOutlined/>}>
                    All Logs
                </Menu.Item>
            </Menu>
            {comp}
        </div>
    )
}
// https://www.golangprograms.com/react-js-update-div-content-on-click.html