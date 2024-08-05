export interface IFilters {
    
    TotalCount : number,
    PageSize  : number,
    CurrentPage  : number,
    TotalPages  : number,
    HasNextPage  : boolean,
    HasPreviousPage  : boolean,
    NextPageUrl :string,
    PreviousPageUrl : string,
    PageNumber: number

}