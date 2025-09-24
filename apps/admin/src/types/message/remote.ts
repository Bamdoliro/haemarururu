export interface PostSendMessageByStatusRequest {
  title: string;
  text: string;
  status: string;
}

export interface PostSendMessageByTypeRequest {
  title: string;
  text: string;
  formType: 'SOCIAL_INTEGRATION' | 'REGULAR';
  isChangeToRegular: boolean;
}

export interface PostSendMessageToAllRequest {
  title: string;
  text: string;
}
