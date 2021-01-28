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
        }
    );

    let updateState = (e : any) => {
        switch (e.key){
            case audit: setState({comp: <Audit/>})
                break;
            case logs: setState({comp: <LogList/>});
                break;
        }
    };

    return(
        <div>
            <Menu onClick={updateState} defaultSelectedKeys={[audit]} mode="horizontal">
                <Menu.Item key={audit} icon={<QuestionCircleFilled/>}>
                    Audit
                </Menu.Item>
                <Menu.Item key={logs} icon={<BookOutlined/>}>
                    All Logs
                </Menu.Item>
            </Menu>
            <div style = {{padding: '1%'}}/>
            {state.comp}
        </div>
    )
}