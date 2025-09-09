import React from 'react';
import { getNumbers } from '../../utils';
import classNames from 'classnames';

type Props = {
  total: string[];
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  onPageChange,
  currentPage,
}) => {
  const pages = Math.ceil(total.length / perPage);
  const totalPages = getNumbers(1, pages);

  const selectPage = (page: number) => {
    onPageChange(page);
  };

  const prevButton = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextButton = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (currentPage < totalPages.length) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={prevButton}
        >
          «
        </a>
      </li>

      {totalPages.map((page, index) => (
        <li
          key={index}
          className={classNames('page-item', { active: currentPage === page })}
        >
          <a
            onClick={() => selectPage(page)}
            data-cy="pageLink"
            className="page-link"
            href={`#${index + 1}`}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={classNames('page-item', {
          disabled: currentPage === totalPages.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages.length}
          onClick={nextButton}
        >
          »
        </a>
      </li>
    </ul>
  );
};
