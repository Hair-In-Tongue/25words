import { combineReducers } from 'redux'
import playerSlice from './reducers/playerSlice'
import loadingSlice from './reducers/loadingSlice'
import bidSlice from './reducers/bidSlice'

export default combineReducers({
    player: playerSlice,
    loading: loadingSlice,
    playerBid: bidSlice,
})
