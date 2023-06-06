import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { fetchSystems, fetchUsers, fetchComputers, fetchLogs } from "../store";
import { styled } from "styled-components";
import { RotateThing } from "../Components";

const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
align-items: start;
flex-direction: column;
`;

const Slupek = styled.div.attrs(props => ({
  $widthSlupek: props.$width
}))`
height:70px;
width:calc( (${props => props.$widthSlupek}/1000)*100% - 10%);
background-color:#ddd;
border: solid black 1px;
text-align: center;
margin: 5px;
p{text-orientation: mixed;};
&:hover{background-color:silver;};
`;

export default function HomeScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSystems());
    dispatch(fetchUsers());
    dispatch(fetchComputers());
    dispatch(fetchLogs());
  }, [dispatch])
  const { dataComputers } = useSelector((state) => { return state.computers });
  const { dataSystems } = useSelector((state) => { return state.systems });
  const { dataLogs } = useSelector((state) => { return state.logs });
  const { dataUsers, isLoading } = useSelector((state) => { return state.users });
  const arrayToRender = [
    { "count": dataComputers, "counted": "Komputery" },
    { "count": dataSystems, "counted": "Systems" },
    { "count": dataLogs, "counted": "Logi" },
    { "count": dataUsers, "counted": "Użytkownicy" },
  ];

  const getLength = (item) => {
    return { ...item, count: item.count.length, width: parseInt(item.count.length) };
  }
  let content;
  if (isLoading) {
    content= <RotateThing/>
  }else{
   content = arrayToRender.map(getLength).reverse().map((item) => {
    return <Slupek key={nanoid()} $width={item.width}><h5>{item.counted}</h5>Ilość:{item.count}</Slupek>
  });}
  return (
    <Wrapper>
      {console.log(dataComputers.length > 0 && Date(dataComputers[0].updated_at))}
      {content}
    </Wrapper>
  )
}