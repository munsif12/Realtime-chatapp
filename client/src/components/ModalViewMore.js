import { Avatar, Dropdown, Modal } from 'antd'
import React from 'react'
import { AiOutlineClose, AiOutlineDown } from "react-icons/ai";
import { useSelector } from 'react-redux';
function ModalViewMore({
  listToMap = [],
  viewMoreModal,
  closeViewMoreModal,
  removeParticipentDropdown,
  removeParticipent,
  setremoveParticipent
}) {
  const {
    chats: { currSelectedChat },
    auth: { user: loggedInUser }
  } = useSelector(state => state)
  return (
    <Modal
      title={
        <div className="flex justify-between items-center">
          <span className='DrawergoBack gap-6 pr-4 pointer'>
            <AiOutlineClose onClick={closeViewMoreModal} />
          </span>
          Add  participents
        </div>
      }
      visible={viewMoreModal}
      closable={false}
      footer={null}
      onCancel={closeViewMoreModal}
    >
      <div className="listOfUsersForAddParticipents customizeViewMore" style={{ marginTop: "0px" }}>
        {
          listToMap.map((elem, index) => (
            <div className="userListItem flex" key={index}>
              <div className="chatImage">
                <Avatar src={!currSelectedChat.isGroupChat ? currSelectedChat.groupChatImage : elem?.profileImage} size="2xl" />
              </div>
              <div className="chatDescLatestMsg pr-4"
                onMouseOver={() => setremoveParticipent(true)}
                onMouseOut={() => setremoveParticipent(false)}>
                <div className="chatNameAndTime flex items-center ">
                  <p className='nameLatestMsg chatName m-0 p-0 text-black text-2xl'>{
                    !currSelectedChat.isGroupChat ?
                      currSelectedChat.chatName :
                      elem?.name}</p>
                  {!currSelectedChat.isGroupChat && currSelectedChat?.groupAdmin?._id === elem._id &&
                    <span className='groupAdminBadge'>
                      Group admin
                    </span>
                  }
                </div>
                <div className="chatDescAndSetting flex items-center">
                  <p className='nameLatestMsg m-0 p-0 text-black text-2xl'>{!currSelectedChat.isGroupChat ?
                    `${currSelectedChat.users.map(u => u.name).join(',')} group members` :
                    elem?.email}</p>
                  {
                    currSelectedChat.isGroupChat && currSelectedChat?.groupAdmin?._id === loggedInUser._id && // to show dropdown if the loggedin user is admin of this group
                    currSelectedChat?.groupAdmin?._id !== elem._id && // to not show dropDown infront of group admin
                    removeParticipent && <div
                      className="showDropDownToRemoveParticipent">
                      <Dropdown
                        overlay={() => removeParticipentDropdown(elem)}
                        trigger={['click']} >
                        <AiOutlineDown />
                      </Dropdown>
                    </div>
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>

    </Modal>
  )
}

export default ModalViewMore