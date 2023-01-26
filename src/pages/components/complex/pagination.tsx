
import React from "react";
import { MusicFilterStates } from "../../../models/musicFilterStates";
import { MusicPaginationType } from "../../login/reqSuccessTypes";
import { VyBtn } from "../base/vyClickable";

export function VyPagination({musicPagination, filterStates, vyAuthToken}:  {musicPagination?: MusicPaginationType, filterStates: React.MutableRefObject<MusicFilterStates>, vyAuthToken?: string}) {

    const { offset=0, limit: itemPerPage = 8, totalCount=1 } = musicPagination ?? {};

    const totalPages = Math.ceil(totalCount / itemPerPage);
    const currentPage = offset <= 0 ? 1 : Math.ceil((offset + 1) / itemPerPage);

    // console.log(`offset: ${offset}, itemPerPAge: ${itemPerPage}, itemTotal: ${itemTotal}`);
    // console.log(`Total pages: ${totalPages}`);
    // console.log(`Current page: ${currentPage}`);

    const paginatioBtns: Array<JSX.Element> = [];

    const getPageButton = ({ pageNum, isSelected, uniqueKey }: { pageNum: string, isSelected?: boolean, uniqueKey?: string }) => {
        return VyBtn({
            btnText: pageNum,
            Options: {
                boldFont: true,
                backgroundColor: isSelected ? 'vy-bg-selection' : 'vy-bg-secondary',
                elementKey: uniqueKey ?? `pagination-${pageNum}`
            },
            onClick: () => {
                if (!isNaN(+pageNum)) {
                    filterStates.current.setPageNum(+pageNum);
                    filterStates.current.triggerFilteredRequest(vyAuthToken);
                }
            }
        });
    }

    if (currentPage !== 1) {
        // paginatioBtns.push( getPageButton({ pageNum: '<'}) );
        paginatioBtns.push( getPageButton({ pageNum: '1'}) );
    }

    if (currentPage > 3) {
        paginatioBtns.push( getPageButton({ pageNum: '...', uniqueKey: 'goToOne' }) );
    }

    if (currentPage > 2) {
        paginatioBtns.push( getPageButton({ pageNum: `${currentPage - 1}`}) );
    }

    if (totalPages > 1) {
        paginatioBtns.push( getPageButton({ pageNum: `${currentPage}`, isSelected: true}) );
    }

    if (currentPage < totalPages - 2) {
        paginatioBtns.push( getPageButton({ pageNum: `${currentPage + 1}`}) );
    }

    if (currentPage < totalPages - 3) {
        paginatioBtns.push( getPageButton({ pageNum: '...', uniqueKey: 'goToTwo'}) );
    }

    if (currentPage !== totalPages) {
        paginatioBtns.push( getPageButton({ pageNum: `${totalPages}`}) );
        // paginatioBtns.push( getPageButton({ pageNum: '>'}) );
    }

    return (
        <div className="d-flex flex-column">
            <div className="d-flex flex-row ">
                {paginatioBtns}
            </div>
        </div>
    );
}
