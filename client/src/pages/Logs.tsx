import React, {useState} from "react";
import { Menu } from 'antd'
import { QuestionCircleFilled, BookOutlined } from '@ant-design/icons';
import Audit from "../components/Logs/Audit";
import LogList from "../components/Logs/LogList";

export const Logs = () => {

    const audit = 'audit';
    const logs = 'logs';
    const [state, setState] = useState(
        {
            comp: <Audit/>,
            current: audit
        }
    );

    let updateState = (e : any) => {
        let newComp = <Audit/>;
        switch (e.key){
            case audit: newComp = <Audit/>;
                break;
            case logs: newComp = <LogList/>;
                break;
        }
        setState({
            comp: newComp,
            current: e.key
        })
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
            {state.comp}
        </div>
    )
}