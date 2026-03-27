export interface DocumentManagemenModel {
  indexNumber: number
  institutionalProcess: string
  iso15189Requirement: string
  documentCode: string
  documentTitle: string
  editionVersion: string
  elaborators: string
  technicalReviewers: string
  formalReviewers: string
  officializedBy: string
  approvalDocument: string
  approvalDate: string
  revisionHistory: string
  nextRevision: string
  revisionDaysCount: number
  revisionStatus: string
  applicationScope: string,
  documentType: string
}
