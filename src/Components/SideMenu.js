import React from "react";
import './components.css';
import Dropdown from "./Dropdown";

function SideMenu({ buttons, onPageSelect, currPage, onChangeSorting, sortFuncs }){
    return <div className="side-bar">
        <table>
            <tbody>
                {buttons.map(e => 
                    <tr key={e}>
                        <td>
                            <button 
                                className={currPage === e ? 'clicked' : ''} 
                                onClick={() => onPageSelect(e)}>
                                    {e}
                            </button>
                        </td>
                    </tr>)
                }
                <tr key='dropdown'>
                    <td><Dropdown options={sortFuncs} onSelect={onChangeSorting}/></td>
                </tr>
            </tbody>
        </table>
    </div>
}

export default SideMenu;