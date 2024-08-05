export interface IGroupFile {

id:number;
nameGroup: string;
ubication: string;
files: [{
    id: number;
    groupId: number;
    nameFile: string;
    nameFile2: string;
}]

}