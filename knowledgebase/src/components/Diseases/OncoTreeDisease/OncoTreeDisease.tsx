import * as React from 'react';
import {EditableStatement, OncoTreeDiseaseQuery, Maybe, XRef} from '../../../generated/graphql';
import './styles.css';
import {AppendedContentActionTypes, useAppendedContentState} from "../../../context/AppendedContentContext";
import {Fragment} from "react";


interface Props {
    data: OncoTreeDiseaseQuery;
    editing_description: boolean;
    editing_synonyms: boolean;
    editing_xrefs: boolean;
}

const className = 'OncoTreeDisease';


const OncoTreeDisease: React.FC<Props> = ({data,editing_description, editing_synonyms, editing_xrefs}) => {
    const [editing_name, set_editing_name] = React.useState(false);
    const {
        AppendedContentState: {},
        setAppendedContentState
    } = useAppendedContentState();

    //copy_description
    const copy_description = async (appended: string) => {
        // console.log('copy_description')
        const appended2 = '\n' + appended
        setAppendedContentState({type: AppendedContentActionTypes.appendToDescription, nextText: appended2})
        // handle_append_to_description('appended stuff')
    };
    const getDescriptionString = (q: OncoTreeDiseaseQuery): string => {
        let s = ''
        if (q != null) {
            if (q.OncoTreeDisease != null) {
                if (q.OncoTreeDisease[0] != null) {
                    if (q.OncoTreeDisease[0].mainType != null) {
                        // @ts-ignore
                        s = q.OncoTreeDisease[0].mainType.statement
                    }
                }
            }
        }
        return s;
    }
    const copy_synonym = async (synonym: string | null) => {
        // console.log('copy_description')
        let text: string = ''

        if (synonym !== null) {
            text = synonym
        }
        setAppendedContentState({type: AppendedContentActionTypes.appendToSynonyms, nextSynonym: text})
        // handle_append_to_description('appended stuff')
    };

    const copy_xref = async (xref: any) => {
        // console.log('copy_description')
        let text: XRef = {id:'',source:'',sourceId:''}

        if (xref !== null) {
            text = xref
        }
        setAppendedContentState({type: AppendedContentActionTypes.appendToXRefs, nextXRef: text})
        // handle_append_to_description('appended stuff')
    };




    if (!data.OncoTreeDisease) {
        return <div>No Selected OntologicalDisease</div>;
    }
    if (!data.OncoTreeDisease[0]) {
        return <div></div>;

    }
    return (
        <div className={className}>
            <h3 className={`${className}__title`}> OncoTree Disease: {data.OncoTreeDisease[0].name.statement}</h3>
            <div className={`${className}__Wrapper`}>
                <div> Code:</div>
                <div> {data.OncoTreeDisease[0].code}</div>
                <div> Tissue:</div>
                <div> {data.OncoTreeDisease[0].tissue.statement}</div>
                <div> Definition: </div>
                <div>{data.OncoTreeDisease[0].mainType.statement}
                    {editing_description ?
                        (
                            <div className="form-group">
                                <button className="btn btn-primary my-1"
                                        onClick={() => copy_description(getDescriptionString(data))}>Copy Description
                                </button>
                            </div>

                        ) :
                        (<span></span>)}</div>


                <div> XRefs: </div>
                <div className={`${className}__XRef_Wrapper`}>
                    <Fragment>
                        <div className="header">Source</div>
                        <div className="header">SourceId</div>
                        <div></div>
                    </Fragment>
                    {data.OncoTreeDisease[0].xrefs.list.map((item, index) => (
                            <Fragment key={index}>
                                <div>{item!.source}</div>
                                <div>{item!.sourceId}</div>
                                <div>{editing_xrefs ? (<button className={`${className}__small-btn`} onClick={() => copy_xref(item)}>Copy XRef </button>) : (<span></span>)}</div>
                            </Fragment>
                    ))}

                </div>

                <div>Children:</div>

                <div>
                    <div> {data.OncoTreeDisease[0].children.length  > 0 ?
                        data.OncoTreeDisease[0].children.map((item,
                                                        index) =>
                            (
                                <div key={index}> {item ? item.name.statement: ''}</div>

                            )) : <span>None</span>}</div>
                </div>


                <div>Parents:</div>

                <div>
                    <div> {data.OncoTreeDisease[0].parent && data.OncoTreeDisease[0].parent.length  > 0 ?
                        data.OncoTreeDisease[0].parent && data.OncoTreeDisease[0].parent.map((item,
                                                                                    index) =>
                            (
                                <div key={index}> {item ? item.name.statement: ''}</div>

                            )) : <span>None</span>}</div>
                </div>

            </div> </div>

    );
};
export default OncoTreeDisease