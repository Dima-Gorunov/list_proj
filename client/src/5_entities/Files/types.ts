export interface IFile {
    id: number;
    name: string;
    type: IFileType;
    url: string;
    createdAt: string;
    size: string;
}

export type IFileType = "videos" | "images" | "files";

export interface IUploadResponse {
    file: IFile;
}

export interface IGetMyFilesResponse {
    files: IFile[];
}

export type IDetailsDeleteFiles = {
    fileId: number;
    fileName: string;
    fileSystem: {
        success: true;
        message: string;
    };
    database: {
        success: true;
        message: string;
    };
};

export interface IDeleteMyFilesResponse {
    result_code: number;
    details: IDetailsDeleteFiles[];
}

// {
//     "result_code": 0,
//     "message": "Successfully deleted 1 of 1 files",
//     "total_requested": 1,
//     "total_found": 1,
//     "total_deleted": 1,
//     "details": [
//         {
//             "fileId": 82,
//             "fileName": "08022026-163937-250_WidgetDoc.pdf",
//             "fileSystem": {
//                 "success": true,
//                 "message": "File deleted from filesystem"
//             },
//             "database": {
//                 "success": true,
//                 "message": "Record deleted from database"
//             }
//         }
//     ]
// }
