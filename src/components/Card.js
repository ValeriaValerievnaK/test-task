import { useCallback } from 'react';
import styled from 'styled-components';
import { ReactComponent as Male } from '../assets/genders/male.svg';
import { ReactComponent as Female } from '../assets/genders/female.svg';
import { ReactComponent as Genderless } from '../assets/genders/genderless.svg';

const COLORS = {
  alive: '#83bf46',
  dead: '#ff5152',
  unknown: '#968c9d',
  cardBg: '#263750',
  male: '#33b3c8',
  female: 'pink',
  genderless: '#999'
};

function getGenderIcon(gender) {
  if (gender === 'Male') {
    return <Male width={20} height={20} fill={COLORS.male} title="Male" />;
  }
  if (gender === 'Female') {
    return (
      <Female width={24} height={24} fill={COLORS.female} title="Female" />
    );
  }
  if (gender === 'Genderless' || gender === 'unknown') {
    return (
      <Genderless
        width={24}
        height={24}
        fill={COLORS.genderless}
        title="Genderless"
      />
    );
  }

  return null;
}

export function Card({ character, onClickHandler }) {
  const { status, name, species, type, gender, image } = character;

  const handleClick = useCallback(() => {
    onClickHandler(character);
  }, [onClickHandler, character]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClickHandler(character);
      }
    },
    [onClickHandler, character]
  );

  return (
    <StyledCard
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <CardImg src={image} alt={name} />

      <CardInfo>
        <CardTitle name={name} gender={gender} />
        <CardStatus status={status} species={species} type={type} />
      </CardInfo>
    </StyledCard>
  );
}

export function CardTitle({ name, gender, className }) {
  const icon = getGenderIcon(gender);

  return (
    <CardTitleContainer className={className}>
      <StyledCardTitle className="card-title">{name}</StyledCardTitle>
      {icon}
    </CardTitleContainer>
  );
}

export function CardStatus({ status, species, type, className }) {
  return (
    <CardStatusContainer className={className}>
      <StyledCardStatus status={status}>{status}</StyledCardStatus>
      {' - '}
      <span>{species}</span>
      {type && <CardType>{type}</CardType>}
    </CardStatusContainer>
  );
}

const CardStatusContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0 4px;
`;

const StyledCardStatus = styled.span`
  display: flex;
  align-items: center;
  text-transform: capitalize;

  &::before {
    content: '';
    display: block;
    margin-right: 8px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: ${({ status }) => {
      switch (status) {
        case 'Alive':
          return COLORS.alive;
        case 'Dead':
          return COLORS.dead;
        default:
          return COLORS.unknown;
      }
    }};
  }
`;

const CardType = styled.p`
  margin-top: 20px;
  width: 100%;
  color: #ddd;
  font-size: 16px;
`;

const StyledCard = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  flex-direction: column;
  background: ${COLORS.cardBg};
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
  outline: none;

  &:hover,
  &:focus-visible {
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px ${COLORS.alive};
  }

  &:hover .card-title,
  &:focus-visible .card-title {
    color: ${COLORS.alive};
  }
`;

const CardImg = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 10px 10px 0 0;
  object-fit: cover;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  padding: 20px;
`;

const CardTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledCardTitle = styled.h2`
  margin-right: 8px;
  transition: color 0.3s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  font-size: 24px;

  @media (max-width: 450px) {
    max-width: 130px;
    font-size: 18px;
  }
`;
