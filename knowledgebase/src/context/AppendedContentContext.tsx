import React, {createContext, useReducer, useContext, ReducerState} from 'react';
import {Maybe, VariantProteinEffect, XRef} from "../generated/graphql";

export type AppendedContentState = {
    textToAppend: string | null;
    synonymToAppend: string | null;
    xrefToAppend: XRef | null;
    proteinEffectToAppend: VariantProteinEffect;
    userName: string;
    userID: string;
};

export enum AppendedContentActionTypes  {appendToDescription='appendToDescription', appendToSynonyms='appendToSynonyms',appendToXRefs='appendToXRefs',appendToProteinEffect='appendToProteinEffect'}

export type AppendedContentActions =
    | {
    type: AppendedContentActionTypes.appendToDescription;
    nextText: string;
}
    | {
    type: AppendedContentActionTypes.appendToSynonyms;
    nextSynonym: string;

}
    | {
    type: AppendedContentActionTypes.appendToXRefs;
    nextXRef: Maybe<XRef>;

}
    | {
    type: AppendedContentActionTypes.appendToProteinEffect;
    nextProteinEffect: VariantProteinEffect;

}

const xref: Maybe<XRef> = {id:'',source:'',sourceId:''}

const initialState: AppendedContentState = {

    textToAppend: '',synonymToAppend:'',xrefToAppend:xref, proteinEffectToAppend: VariantProteinEffect.Unknown, userName:'manuel.glynias@omniseq.com',userID:'user_20200419151555871926'
}

const initialAppendedContentContext: { AppendedContentState: AppendedContentState; setAppendedContentState: React.Dispatch<AppendedContentActions> } = {
    AppendedContentState: initialState,
    // will update to the reducer we provide in AppendedContentProvider
    setAppendedContentState: () => {}
};

// No need to export this as we use it internally only
const AppendedContentContext = createContext(initialAppendedContentContext);

const reducer = (state: AppendedContentState, action: AppendedContentActions) => {
    switch (action.type) {
        case 'appendToDescription':
            return {
                // if we had other state I would spread it here: ...state,
                textToAppend: action.nextText
            };
        case 'appendToSynonyms':
            return {
                synonymToAppend: action.nextSynonym
            };
        case 'appendToXRefs':
            return {
                xrefToAppend: action.nextXRef
            };
        case 'appendToProteinEffect':
            return {
                proteinEffectToAppend: action.nextProteinEffect
            };

        default:
            return state;
    }
};

interface AppendedContentProviderProps {
    children: any;
}


export function AppendedContentProvider({ children }: AppendedContentProviderProps) {
    // @ts-ignore
    const [state, dispatch] = useReducer(reducer,initialState);

    // rename the useReducer result to something more useful
    const AppendedContentState = state;
    const setAppendedContentState = dispatch;

    // pass the state and reducer to the context, dont forget to wrap the children
    return <AppendedContentContext.Provider value={{ AppendedContentState, setAppendedContentState }}>{children}</AppendedContentContext.Provider>;
}

export const useAppendedContentState = () => useContext(AppendedContentContext);