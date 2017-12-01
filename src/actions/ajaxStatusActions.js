import * as types from './actionTypes';

/* eslint-disable import/prefer-default-export */
export function beginAjaxCall() {
  return { type: types.BEGIN_AJAX_CALL };
}

export function ajaxCallError() {
  return { type: types.AJAX_CALL_ERROR };
}

