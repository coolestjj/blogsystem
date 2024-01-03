import React from "react";
import {Link} from "react-router-dom";
import Edit from "../img/Edit.png";
import Delete from "../img/Delete.png";
import Menu from "../components/Menu";

const Single = () => {
    return (
        <div className='single'>
            <div className="content">
                <img />
                <div className="user">
                    <img />
                    <div className="info">
                        <span>John</span>
                        <p>Posted 2 days ago</p>
                    </div>
                    <div className="edit">
                        <Link to={`/write?edit=2`}>
                            <img src={Edit} alt="edit"/>
                        </Link>
                        <img src={Delete} alt="delete"/>
                    </div>
                </div>
                <h1>This is text header</h1>
                <p>
                    China is increasing military pressure to assert its claims over Taiwan, a democratic-led island where presidential and parliamentary elections are scheduled for January 13.

                    Xi Jinping's New Year address sounded more assertive than the previous year, where he only mentioned that people on both sides of the Taiwan Strait are "members of one and the same family".

                    Responding to Xi Jinping's speech, Tsai emphasized that the most important principle in dealing with China is democracy.
                    "This is taking the joint will of Taiwan's people to make a decision. After all, we are a democratic country," she said.

                    China should respect the election results in Taiwan, and both sides are responsible for maintaining peace and stability in the strait, Tsai added.

                    China has portrayed the elections as a choice between war and peace and rejected multiple proposals from Tsai for negotiations.
                </p>
            </div>


            <div className="menu">
                <Menu/>
            </div>
        </div>
    );
}

export default Single;