<template>
  <div class="app">
    <h1>twitch-perspective-demo</h1>
    <h2>By default, you have 1 QPS, that is not suitable for very fast chats (>1 message/second).</h2>
    <div class="panel">
      <div class="config">
        <input type="text" v-model="channel" /><br/>
        <button @click="changeChannel">Connect</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

export default {
  data: () => ({
    channel: '',
    testMessage: ''
  }),
  methods: {
    changeChannel() {
      const { channel } = this;
      instance.put('/api/channel', { channel });
    },
  }
}
</script>