import * as React from 'react';
import {useOncoTreeDiseaseQuery} from '../../../generated/graphql';
//import OncoTreeDisease  from "./OncoTreeDisease";
import OntologicalDisease from "../OntologicalDisease/OntologicalDisease";
import OncoTreeDisease from "./OncoTreeDisease";

interface Props {
    id: string;
    editing_description: boolean;
    editing_synonyms: boolean;
    editing_xrefs: boolean;
}

const OncoTreeDiseaseContainer = ({ id, editing_description, editing_synonyms, editing_xrefs}: Props) => {
    const { data, error, loading, refetch } = useOncoTreeDiseaseQuery(
        { variables: { id: id } });
    React.useEffect(() => {
        refetch();
    }, [id, refetch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>ERROR</div>;
    }

    if (!data) {
        return <div>Select a disease from the panel</div>;
    }

    return <OncoTreeDisease data={data} editing_description={editing_description} editing_synonyms={editing_synonyms} editing_xrefs={editing_xrefs}/>;
};
export default OncoTreeDiseaseContainer;
