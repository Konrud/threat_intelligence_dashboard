
export interface ThreatIntelState {
  loading: boolean;
  error: string | null;
  currentResult: any | null;
  searchHistory: any[];
}

// Define your action types
export type ThreatIntelAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_RESULT'; payload: any }
  | { type: 'ADD_TO_HISTORY'; payload: any }
  | { type: 'LOAD_HISTORY'; payload: any[] }
  | { type: 'CLEAR_RESULT' };



export const threatIntelReducer = (state: ThreatIntelState, action: ThreatIntelAction) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_RESULT':
      return { 
        ...state, 
        currentResult: action.payload, 
        loading: false, 
        error: null 
      };
    case 'ADD_TO_HISTORY':
      action.payload.timestamp = new Date().toISOString(); // Add timestamp to history item
      return { 
        ...state, 
        searchHistory: [action.payload, ...state.searchHistory.slice(0, 9)] 
      };
    case 'LOAD_HISTORY':
      return {
        ...state,
        searchHistory: action.payload
      };
    case 'CLEAR_RESULT':
      return { ...state, currentResult: null };
    default:
      return state;
  }
};