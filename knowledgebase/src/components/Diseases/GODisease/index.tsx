import * as React from 'react';
import {GoDisease, useGoDiseaseQuery} from '../../../generated/graphql';
//import GODisease  from "./GODisease";
import OntologicalDisease from "../OntologicalDisease/OntologicalDisease";
import GODisease from "./GODisease";

interface Props {
    id: string;
    editing_description: boolean;
    editing_synonyms: boolean;
    editing_xrefs: boolean;
}

const GoDiseaseContainer = ({ id, editing_description, editing_synonyms, editing_xrefs}: Props) => {
    const { data, error, loading, refetch } = useGoDiseaseQuery(
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

    return <GODisease data={data} editing_description={editing_description} editing_synonyms={editing_synonyms} editing_xrefs={editing_xrefs}/>;
};
export default GoDiseaseContainer;
