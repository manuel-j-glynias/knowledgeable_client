import * as React from 'react';
import {EditableStatement, GoDiseaseQuery, Maybe, XRef} from '../../../generated/graphql';
import './styles.css';
import {AppendedContentActionTypes, useAppendedContentState} from "../../../context/AppendedContentContext";
import {Fragment} from "react";

interface Props {
    data: GoDiseaseQuery;
    editing_description: boolean;
    editing_synonyms: boolean;
    editing_xrefs: boolean;
}

const className = 'GODisease';

const GODisease: React.FC<Props> = ({data,editing_description, editing_synonyms, editing_xrefs}) => {
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
    const getDescriptionString = (q: GoDiseaseQuery): string => {
        let s = ''
        if (q != null) {
            if (q.GODisease != null) {
                if (q.GODisease[0] != null) {
                    if (q.GODisease[0].definition != null) {
                        // @ts-ignore
                        s = q.GODisease[0].definition.statement
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


    if (!data.GODisease) {
        return <div>No Selected OntologicalDisease</div>;
    }
    if (!data.GODisease[0]) {
        return <div></div>;

    }
    return (
        <div className={className}>
            <h3 className={`${className}__title`}> GO Disease: {data.GODisease[0].name.statement}</h3>
            <div className={`${className}__Wrapper`}>
                <div> goId:</div>
                <div> {data.GODisease[0].goId}</div>
                <div> Definition: </div>
                <div>{data.GODisease[0].definition.statement}
                    {editing_description ?
                        (
                            <div className="form-group">
                                <button className="btn btn-primary my-1"
                                        onClick={() => copy_description(getDescriptionString(data))}>Copy Description
                                </button>
                            </div>

                        ) :
                        (<span></span>)}</div>
                <div> Synonyms: </div>
                <div>{data.GODisease[0].synonyms.stringList.map((item, index) => (
                    <div className={`${className}__Synonym_Wrapper`} key={index}>
                        <div>{item}</div>
                        <div>
                            {editing_synonyms ?
                                (
                                    <button className={`${className}__small-btn`}
                                            onClick={() => copy_synonym(item)}>Copy Synonym
                                    </button>
                                )
                                :
                                (<span></span>)}
                        </div>
                    </div>
                ))}</div>

                <div> XRefs: </div>
                    <div className={`${className}__XRef_Wrapper`}>
                        <Fragment>
                            <div className="header">Source</div>
                            <div className="header">SourceId</div>
                            <div></div>
                        </Fragment>
                        {data.GODisease[0].xrefs.list.map((item, index) => (
                            <Fragment key={index}>
                                <div>{item!.source}</div>
                                <div>{item!.sourceId}</div>
                                <div>{editing_xrefs ? (<button className={`${className}__small-btn`} onClick={() => copy_xref(item)}>Copy XRef</button>) : (<span></span>)}</div>
                            </Fragment>
                        ))}

                    </div>




                <div>Children:</div>

                <div>
                    <div> {data.GODisease[0].children.length  > 0 ?
                        data.GODisease[0].children.map((item,
                                                        index) =>
                            (
                                <div key={index}> {item ? item.name.statement: ''}</div>

                            )) : <span>None</span>}</div>
                </div>


                <div>Parents:</div>

                <div>
                    <div> {data.GODisease[0].parents && data.GODisease[0].parents.length  > 0 ?
                        data.GODisease[0].parents && data.GODisease[0].parents.map((item,
                                                                                    index) =>
                            (
                                <div key={index}> {item ? item.name.statement: ''}</div>

                            )) : <span>None</span>}</div>
                </div>

                <div>Jax Diseases:</div>
                <div>
                    <div> {data.GODisease[0].jaxDiseases && data.GODisease[0].jaxDiseases.length  > 0 ?
                        data.GODisease[0].jaxDiseases && data.GODisease[0].jaxDiseases.map((item,
                                                                                    index) =>
                            (
                                <div key={index}> {item ? item.name.statement: ''}</div>

                            )) : <span>None</span>}</div>
                </div>

                </div> </div>

    );
};
export default GODisease