import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameStarted: false,
  end: false,
  currentPlayer: null,
  player: null,
  rollCount: 0,
  dice: [1, 1, 1, 1, 1],
  diceFix: [false, false, false, false, false],

  GAME_START: {},
  ROLL_DICE: { scoreOptions: [] },
  FIX_DICE: {},
  CHOICE_SCORE: {},
  GAME_DONE: {},
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // currentPlayer 업데이트
    updateCurrentPlayer(state, action) {
      state.currentPlayer = action.payload;
    },

    // rollCount 업데이트
    updateRollCount(state, action) {
      state.rollCount = action.payload;
    },

    // gameStarted 업데이트
    updateGameStarted(state, action) {
      state.gameStarted = action.payload;
    },

    // player 업데이트
    updatePlayer(state, action) {
      state.player = action.payload;
    },

    // dice 업데이트
    updateDice(state, action) {
      state.dice = action.payload;
    },

    // diceFix 업데이트
    updateDiceFix(state, action) {
      state.diceFix = action.payload;
    },

    // end 업데이트
    updateEnd(state, action) {
      state.end = action.payload;
    },

    // GAME_START 데이터를 업데이트
    updateGameStartData(state, action) {
      state.GAME_START = { ...state.GAME_START, ...action.payload };
    },

    // ROLL_DICE 데이터를 업데이트
    updateRollDiceData(state, action) {
      state.ROLL_DICE = { ...state.ROLL_DICE, ...action.payload };
    },

    // FIX_DICE 데이터를 업데이트
    updateFixDiceData(state, action) {
      state.FIX_DICE = { ...state.FIX_DICE, ...action.payload };
    },

    // CHOICE_SCORE 데이터를 업데이트
    updateScoreData(state, action) {
      state.CHOICE_SCORE = { ...state.CHOICE_SCORE, ...action.payload };
    },

    // GAME_DONE 데이터를 업데이트
    updateGameResult(state, action) {
      state.GAME_DONE = { ...state.GAME_DONE, ...action.payload };
    },
  },
});

export const {
  updateCurrentPlayer,
  updateRollCount,
  updateGameStarted,
  updatePlayer,
  updateDice,
  updateDiceFix,
  updateEnd,
  updateGameStartData,
  updateRollDiceData,
  updateFixDiceData,
  updateScoreData,
  updateGameResult,
} = gameSlice.actions;

export default gameSlice.reducer;
