import { PHONE_NUMBER, ROUTES } from '@/constants/common/constants';
import { color, font } from '@maru/design-system';
import { Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import Link from 'next/link';
import styled from 'styled-components';

const Footer = () => {
  return (
    <StyledFooter>
      <FooterBox>
        <Column gap={40} height={262}>
          <img
            loading="lazy"
            src="/svg/maruGrayLogo.svg"
            width={107}
            height={32}
            alt="logo"
          />
          <Column gap={8}>
            <InfoBox>
              <Text fontType="p2" color={color.gray600}>
                주소: 부산광역시 해운대구 우동3로 11번길 43 (46708)
              </Text>
              <Text fontType="p2" color={color.gray600}>
                입학문의: {PHONE_NUMBER.ADMISSION_OFFICER_ONE},{' '}
                {PHONE_NUMBER.ADMISSION_OFFICER_TWO},{' '}
                {PHONE_NUMBER.ADMISSION_OFFICER_THREE}
              </Text>
              <Text fontType="p2" color={color.gray600}>
                행정실: {PHONE_NUMBER.TEACHER_OFFICE_PHONE_NUMBER}, Fax:
                {PHONE_NUMBER.TEACHER_OFFICE_FAX}
              </Text>
            </InfoBox>
            <Text fontType="p3" color={color.gray600}>
              Copyright © 밤돌이로 all rights reserved.
            </Text>
          </Column>
        </Column>
        <Row gap={105} alignItems="flex-start">
          <Row gap={125} alignItems="flex-start">
            <Column gap={24}>
              <StyledLink href={ROUTES.FORM}>원서접수</StyledLink>
              <StyledLink href={ROUTES.NOTICE}>공지사항</StyledLink>
              <StyledLink href={ROUTES.FAQ}>자주묻는질문</StyledLink>
              <StyledLink href={ROUTES.SCHOOL}>학교 홈페이지</StyledLink>
            </Column>
          </Row>
          <Row gap={125} alignItems="flex-start">
            <Column gap={24}>
              <StyledLink href={ROUTES.TERMS_OF_SERVICE}>이용약관</StyledLink>
              <StyledLink href={ROUTES.PRIVACY_POLCY}>개인정보처리방침</StyledLink>
              <StyledLink href={ROUTES.PERSONAL_INFO_COLLECTION}>
                개인정보 수집
              </StyledLink>
            </Column>
          </Row>
        </Row>
      </FooterBox>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  background-color: ${color.gray100};
  padding: 40px 174px 48px 96px;
`;

const FooterBox = styled.div`
  ${flex({ justifyContent: 'space-between', alignItems: 'center' })}
  height: 262px;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;

const InfoBox = styled.div`
  ${flex({ flexDirection: 'column' })}
  gap: 8px;
  border-bottom: 1px solid ${color.gray300};
  padding-bottom: 20px;
`;

const StyledLink = styled(Link)`
  ${font.p2}
  color: ${color.gray600};
`;
