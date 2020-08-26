import * as React from 'react';
import ContentContainer from './ContentContainer'
import {useOntologicalDiseaseComponentsQuery} from "../../../generated/graphql";

interface Props {
    id: string;
    editing_description: boolean;
    editing_synonyms: boolean;
    editing_xrefs: boolean;
}

const ContentContainerContainer = ({ id, editing_synonyms,editing_description,editing_xrefs }: Props) => {
    const { data, error, loading, refetch } = useOntologicalDiseaseComponentsQuery(
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
        return <div>Please select a gene from the panel</div>;
    }

    return <ContentContainer data={data} editing_description={editing_description}  editing_synonyms={editing_synonyms} editing_xrefs={editing_xrefs}/>;
};

export default ContentContainerContainer;
