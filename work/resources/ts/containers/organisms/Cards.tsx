/* eslint-disable react/display-name */
import React, { useState, useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Grid } from '@material-ui/core';
import { DragCard } from '../../components/molecules/DragCard';
import { AddIcon } from '../../components/atoms/AddIcon';
import { ModalWindow } from '../../components/molecules/ModalWindow';
import { ModalCard } from '../../components/molecules/ModalCard';
import { ModalPropsContext } from '../../contexts/childContexts/ModalPropsContext';
import { StylesContext } from '../../contexts/childContexts/StylesContext';
import { ApiCardsContext } from '../../contexts/childContexts/ApiCardsContext';

type Props = {
  items?: any;
  onDragEnd: any;
  createOnSubmit: (value: string) => void;
  updateOnSubmit: (value: string, id: number) => void;
  deleteOnClick: (id?: string) => void;
};

export const Cards = React.memo<Props>((props) => {
  /**
   * cssの定義
   * dragBoardItemのレンダーするデータを読み取り
   * { モーダルに渡す表示内容 表示のon/off切り替え }
   * 新規作成か更新か判別するstate
   */
  const { useStyles } = useContext<any>(StylesContext);
  const classes = useStyles();
  const { cardsState } = useContext<any>(ApiCardsContext);
  const { modalValueState, setModalValueState, modalOpenState, setModalOpenState } = useContext<
    any
  >(ModalPropsContext);
  const [createState, setCreateState] = useState<boolean>(false);

  // モーダルを閉じるとき、入力値をクリア
  const modalClose = () => {
    setModalOpenState(false);
    setCreateState(false);
    setModalValueState({
      id: null,
      cardContent: '',
    });
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <DragDropContext onDragEnd={props.onDragEnd}>
            <Droppable droppableId='list'>
              {(provided) => (
                <div ref={provided.innerRef} className={classes.drop_able}>
                  {props.items.map(
                    (
                      item: {
                        id: string;
                        title: string;
                        content: string;
                      },
                      index: number
                    ) => (
                      <DragCard
                        item={item}
                        index={index}
                        key={item.id}
                        openOnClick={() => {
                          setModalOpenState(true);
                          setModalValueState({
                            ...modalValueState,
                            id: item.id,
                            cardContent: item.content,
                          });
                        }}
                        deleteOnClick={() => {
                          props.deleteOnClick(item.id);
                        }}
                      />
                    )
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
        <Grid item xs={12} className={classes.centerPlacement}>
          <AddIcon
            onClick={() => {
              setModalOpenState(true);
              setCreateState(true);
              setModalValueState({
                ...modalValueState,
                id: String(cardsState.numberMade),
              });
            }}
          />
        </Grid>
      </Grid>
      <ModalWindow modalOpen={modalOpenState} modalOnClose={modalClose}>
        <ModalCard
          modalOnClose={modalClose}
          // 押したボタンの番号によって、表示内容を変える
          defaultValue={modalValueState.cardContent}
          postOnSubmit={(value) => {
            // eslint-disable-next-line no-unused-expressions
            createState
              ? (modalClose(), props.createOnSubmit(value))
              : (modalClose(), props.updateOnSubmit(value, modalValueState.id));
          }}
        />
      </ModalWindow>
    </>
  );
});
