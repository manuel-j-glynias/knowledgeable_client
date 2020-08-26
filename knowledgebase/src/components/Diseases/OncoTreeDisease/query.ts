import gql from 'graphql-tag';

export const QUERY_OntolgicalDisease = gql`    
    query OncoTreeDisease($id:ID){
        OncoTreeDisease(id: $id) {
            name {
                statement
            }
            mainType {
                statement
            }
            xrefs {
                list {
                    source
                    sourceId
                }
            }
            tissue {
                statement
            }
            parent {
                name {
                    statement
                }
            }
            children {
                name {
                    statement
                }
            }
            code
        }
    }
`;