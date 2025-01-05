import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import PrimaryButton from "../../Buttons/PrimaryButton";
import PrimaryInput from "../../Inputs/PrimaryInput";
import { createRoom, joinRoom } from "../../../../thunk/roomThunk";
import { useDispatch, useSelector } from "react-redux";
import { setCreateRoomCode, setMessage } from "../../../../store/modalSlice";
import { disconnectStompExceptForInitialization } from "../../../../thunk/stompThunk";
import CopyInvitationCode from "../../../Lobby/CopyInvitationCode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";

const PartContainer = styled.div`
  padding: 0 2rem;
`;

const CreateRoomContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const Contour = styled.hr`
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1rem 0;
`;

const ModalText = styled.div`
  font-size: 1rem;
  color: #555;
  margin-bottom: 1rem;
`;

const ModalTextMain = styled.div`
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;
`;
const DiceIcon = styled(FontAwesomeIcon)`
  font-size: 2.5rem;
  color: #f3a0b5;
`;
const StyledEnterCodeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledPrimaryInput = styled(PrimaryInput)`
  flex: 1;
  box-sizing: border-box;
`;

const WithFriendsModal = () => {
  const dispatch = useDispatch();
  const { createRoomCode, message } = useSelector((state) => state.modal);
  const [roomCode, setRoomCode] = useState(""); // 입력된 방 코드
  const inputRef = useRef(null); // 입력창 참조

  useEffect(() => {
    if (
      message === "존재하지 않은 초대 코드입니다." ||
      message === "참여 인원을 초과했습니다."
    ) {
      dispatch(disconnectStompExceptForInitialization()); // STOMP 연결 종료
      return;
    }
  }, [message, dispatch]);

  const handleCreateRoom = () => {
    console.log("방 만들기 클릭!!");

    dispatch(createRoom());
  };

  const handleJoinRoom = () => {
    if (!roomCode.trim()) {
      inputRef.current.focus();
      return;
    }

    dispatch(joinRoom(roomCode)); // 방 코드 전달
  };

  const handleCancelMatching = () => {
    dispatch(disconnectStompExceptForInitialization()); // STOMP 연결 종료
    dispatch(setCreateRoomCode(""));
    dispatch(setMessage("매칭이 취소되었습니다."));
  };

  return (
    <>
      {/**'방 만들기'로 초대 코드를 받는 사람만 UI를 볼 수 있도록 설정*/}
      {createRoomCode ? (
        // 방이 생성된 경우
        <>
          <CopyInvitationCode>{createRoomCode}</CopyInvitationCode>{" "}
          {createRoomCode === "생성 중 ..." ? (
            <ModalText>코드가 생성 중입니다. 잠시만 기다려주세요.</ModalText>
          ) : (
            <ModalText>상대방에게 코드를 알려주세요!</ModalText>
          )}
          <PrimaryButton onClick={handleCancelMatching}>
            매칭 취소
          </PrimaryButton>
        </>
      ) : (
        // 방 생성 및 입장 화면
        <>
          <PartContainer>
            <CreateRoomContainer>
              <PrimaryButton onClick={handleCreateRoom}>
                방 만들기
              </PrimaryButton>
              <DiceIcon icon={faDice} />
            </CreateRoomContainer>
          </PartContainer>
          <Contour />
          <PartContainer>
            <ModalTextMain>친구에게 받은 코드를 입력하세요.</ModalTextMain>
            <StyledEnterCodeContainer>
              <StyledPrimaryInput
                ref={inputRef} // 입력창에 포커스 참조
                placeholder="코드를 입력하세요."
                value={roomCode}
                alphanumericOnly={true}
                onChange={setRoomCode}
                maxLength={6}
              />
              <PrimaryButton onClick={handleJoinRoom}>입장하기</PrimaryButton>
            </StyledEnterCodeContainer>
          </PartContainer>
        </>
      )}
    </>
  );
};

export default WithFriendsModal;
