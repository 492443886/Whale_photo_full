<template>
    <div class="button button-3">
        <div class="circle"></div>
        <span>
            <slot></slot>
        </span>
    </div>
</template>
  
<style scoped>
.button-3 {
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

.button-3 span {
    position: relative;
    transition: all .45s ease-Out;
}

.circle {
    width: 0%;
    height: 0%;
    opacity: 0;
    line-height: 40px;
    border-radius: 50%;
    background: var(--Beige);
    position: absolute;
    transition: all .5s ease-Out;
    top: 20px;
    left: 70px;
}

.button-3:hover .circle {
    width: 200%;
    height: 500%;
    opacity: 1;
    top: -70px;
    left: -70px;
}

.button-3:hover span {
    color: #612400;
}

.button {
    display: inline-flex;
    height: 37px;
    width: 140px;
    border: 2px solid var(--Maroon_Brown);
    margin: 5px 3px;
    color: #aaaaaa;
    text-transform: uppercase;
    text-decoration: none;
    font-size: .8em;
    letter-spacing: 1.5px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

span {
    color: var(--Maroon_Brown);
    text-decoration: none;
    letter-spacing: 1px;
}
</style>
  