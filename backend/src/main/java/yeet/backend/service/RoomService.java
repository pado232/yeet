package yeet.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yeet.backend.data.GameData;
import yeet.backend.data.GameDataManager;
import yeet.backend.data.ScoreBoard;
import yeet.backend.dto.responseDto.GameRemoveResponseDto;
import yeet.backend.dto.responseDto.GameStartResponseDto;
import yeet.backend.dto.responseDto.RoomCodeResponseDto;
import yeet.backend.exception.RoomFullException;
import yeet.backend.exception.RoomNotFoundException;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final GameDataManager gameDataManager;

    // 방 생성
    public RoomCodeResponseDto roomCreate(String player) {

        // 방 생성 (+ 방코드 반환)
        String roomCode = gameDataManager.createRoom(player);

        // 반환 DTO 생성
        RoomCodeResponseDto response = new RoomCodeResponseDto(roomCode);

        return response;
    }

    // 방 참여
    public GameStartResponseDto roomJoin(String roomCode, String player) {

        // 방 존재 여부
        if(!gameDataManager.isRoomExists(roomCode)){
            throw new RoomNotFoundException(roomCode);
        }

        GameData gameData = gameDataManager.getGameData(roomCode);

        // 참여 가능 여부
        if(gameData.isFull() || gameData.isStarted()){
            throw new RoomFullException(roomCode);
        }

        // 방 참여
        ScoreBoard scoreBoard = new ScoreBoard();
        gameData.addPlayer(player, scoreBoard);

        return new GameStartResponseDto(gameData);
    }

    // 방 나가기
    public GameRemoveResponseDto roomRemove(String roomCode, String player) {

        GameData gameData = gameDataManager.getGameData(roomCode);

        gameDataManager.removeRoom(roomCode);

        return new GameRemoveResponseDto(gameData, player);
    }
}
