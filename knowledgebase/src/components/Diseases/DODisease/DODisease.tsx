import * as React from 'react';
import {EditableStatement, DoDiseaseQuery, Maybe, XRef} from '../../../generated/graphql';
import './styles.css';
import {AppendedContentActionTypes, useAppendedContentState} from "../../../context/AppendedContentContext";
import {Fragment} from "react";


interface Props {
    data: DoDiseaseQuery;
    editing_description: boolean;
    editing_synonyms: boolean;
    editing_xrefs: boolean;
}

const className = 'DODisease';


const DODisease: React.FC<Props> = ({data,editing_description, editing_synonyms, editing_xrefs}) => {
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
    const getDescriptionString = (q: DoDiseaseQuery): string => {
        let s = ''
        if (q != null) {
            if (q.DODisease != null) {
                if (q.DODisease[0] != null) {
                    if (q.DODisease[0].definition != null) {
                        // @ts-ignore
                        s = q.DODisease[0].definition.statement
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


    if (!data.DODisease) {
        return <div>No Selected OntologicalDisease</div>;
    }
    if (!data.DODisease[0]) {
        return <div></div>;

    }
    return (
        <div className={className}>
            <h3 className={`${className}__title`}> DO Disease: {data.DODisease[0].name.statement}</h3>
            <div className={`${className}__Wrapper`}>
                <div> doId:</div>
                <div> {data.DODisease[0].doId}</div>
                <div> Definition: </div>
                <div>{data.DODisease[0].definition.statement}
                    {editing_description ?
                        (
                            <div className="form-group">
                                <button className="btn btn-primary my-1"
                                        onClick={() => copy_description(getDescriptionString(data))}>Copy Description
                                </button>
                            </div>

                        ) :
                        (<span></span>)}</div>
                <div> Exact Synonyms: </div>
                <div>{data.DODisease[0].exactSynonyms && data.DODisease[0].exactSynonyms.stringList.map((item, index) => (
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
                <div> Related Synonyms: </div>
                <div>{data.DODisease[0].relatedSynonyms && data.DODisease[0].relatedSynonyms.stringList.map((item, index) => (
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
                <div> Narrow Synonyms: </div>
                <div> {data.DODisease[0].narrowSynonyms && data.DODisease[0].narrowSynonyms.stringList.map((item, index) => (
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
                    {data.DODisease[0].xrefs.list.map((item, index) => (
                            <Fragment key={index}>
                                <div>{item!.source}</div>
                                <div>{item!.sourceId}</div>
                                <div>{editing_xrefs ? (<button className={`${className}__small-btn`} onClick={() => copy_xref(item)}>Copy XRef</button>) : (<span></span>)}</div>
                            </Fragment>
                    ))}

                </div>

                <div>Children:</div>

                <div>
                    <div> {data.DODisease[0].children.length  > 0 ?
                        data.DODisease[0].children.map((item,
                                                        index) =>
                            (
                                <div key={index}> {item ? item.name.statement: ''}</div>

                            )) : <span>None</span>}</div>
                </div>


                <div>Parents:</div>

                <div>
                    <div> {data.DODisease[0].parents && data.DODisease[0].parents.length  > 0 ?
                        data.DODisease[0].parents && data.DODisease[0].parents.map((item,
                                                                                                      index) =>
                            (
                                <div key={index}> {item ? item.name.statement: ''}</div>

                            )) : <span>None</span>}</div>
                </div>

                <div>Subsets:</div>
                <div>{data.DODisease[0].subsets &&
                data.DODisease[0].subsets && data.DODisease[0].subsets.stringList}</div>

            </div> </div>

    );
};
export default DODisease