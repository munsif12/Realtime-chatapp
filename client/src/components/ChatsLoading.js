import { Skeleton } from 'antd'
import React from 'react'

function ChatsLoading() {
    return (
        [...Array(10)].map((item, index) => (
            <div className="userListItem flex" style={{ marginTop: '3px' }} key={index}>
                <div className="chatImage">
                    <Skeleton.Avatar active={true} size={"large"} shape={"circle"} />
                </div>
                <div className="chatDescLatestMsg pr-4">
                    <div className="chatNameAndTime flex items-center ">
                        <Skeleton.Input active={true} size={"small"} shape={"circle"} block={false} />
                    </div>
                    <div className="chatDescAndSetting flex items-center">
                        <Skeleton.Input active={true} size={"small"} shape={"circle"} block={true} />
                    </div>
                </div>
            </div>
        ))
    )
}

export default ChatsLoading