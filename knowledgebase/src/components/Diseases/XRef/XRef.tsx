import * as React from "react";
import {Fragment} from "react";
import {XRefQuery} from "../../../generated/graphql";
import './styles.css';

interface Props{
    id: string;
    data:XRefQuery;
    refetch: () => void;
}

const className = 'XRef';

const XRef : React.FC<Props> = ({data,id, refetch}) => {

    if (!data.OntologicalDisease){
        return <div>No XRef</div>;
    }
    if (!data.OntologicalDisease[0]){
        return <div>No XRef</div>;
    }

    return (
        <div className={className} >
            <div className={`${className}__Wrapper`}>
                <Fragment>
                    <div className="header">Source</div>
                    <div className="header">SourceId</div>
                </Fragment>
                {data.OntologicalDisease[0].xrefs.list &&
                data.OntologicalDisease[0].xrefs.list.map(
                    (name ,index) =>
                        name && (
                            <Fragment key={index}>
                                <div >{name.source}</div>
                                <div >{name.sourceId}</div>
                            </Fragment>    ),
                )}
            </div>
        </div>
    )

    }
export default XRef;